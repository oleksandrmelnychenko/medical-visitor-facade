"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw, FileText } from "lucide-react";
import styles from "./admin.module.scss";

type Application = {
  id: string;
  applicationNum: string;
  status: string;
  isEuResident: boolean | null;
  createdAt: string;
  user: {
    id: string;
    email: string;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  location: { code: string; nameRu: string } | null;
  preferredCity: { code: string; nameRu: string } | null;
  insurance: { code: string; nameRu: string } | null;
  travelAbility: { code: string; nameRu: string } | null;
  services: Array<{
    service: { code: string; nameRu: string };
  }>;
};

type PaginationInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const statusColors: Record<string, string> = {
  NEW: "#3b82f6",
  IN_REVIEW: "#f59e0b",
  CONTACTED: "#8b5cf6",
  IN_PROGRESS: "#06b6d4",
  COMPLETED: "#10b981",
  CANCELLED: "#ef4444",
  ARCHIVED: "#6b7280",
};

const statusLabels: Record<string, string> = {
  NEW: "Новая",
  IN_REVIEW: "На рассмотрении",
  CONTACTED: "Связались",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершена",
  CANCELLED: "Отменена",
  ARCHIVED: "В архиве",
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    // Check role - only ADMIN and MANAGER can access
    if (status === "authenticated" && session?.user) {
      const role = (session.user as { role?: string }).role;
      if (role !== "ADMIN" && role !== "MANAGER") {
        router.push("/dashboard");
      }
    }
  }, [status, session, router]);

  const fetchApplications = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/applications?page=${page}&limit=10`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch applications");
      }

      setApplications(data.data);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchApplications();
    }
  }, [status]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className={styles.loadingContainer}>
        <RefreshCw className={styles.spinner} size={32} />
        <p>Загрузка...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Панель администратора</h1>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{session?.user?.name || session?.user?.email}</span>
            <button onClick={handleLogout} className={styles.logoutButton} title="Выйти">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>


      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            <h2>Заявки</h2>
            <div className={styles.statsInline}>
              <span><strong>{pagination?.total || 0}</strong> всего</span>
              <span><strong>{applications.filter((a) => a.status === "NEW").length}</strong> новых</span>
              <span><strong>{applications.filter((a) => a.status === "IN_PROGRESS").length}</strong> в работе</span>
            </div>
          </div>
          <button onClick={() => fetchApplications(pagination?.page || 1)} className={styles.refreshButton}>
            <RefreshCw size={18} />
            Обновить
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {applications.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={48} />
            <p>Заявок пока нет</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Клиент</th>
                  <th>Контакты</th>
                  <th>Откуда</th>
                  <th>Куда</th>
                  <th>Услуги</th>
                  <th>Статус</th>
                  <th>Создано</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className={styles.appNum}>{app.applicationNum}</td>
                    <td>
                      <div className={styles.clientName}>
                        {app.user.firstName} {app.user.lastName}
                      </div>
                    </td>
                    <td>
                      <div className={styles.contacts}>
                        <div>{app.user.phone}</div>
                        <div className={styles.email}>{app.user.email}</div>
                      </div>
                    </td>
                    <td>{app.location?.nameRu || "—"}</td>
                    <td>{app.preferredCity?.nameRu || "—"}</td>
                    <td>
                      <div className={styles.services}>
                        {app.services.length > 0
                          ? app.services.map((s) => s.service.nameRu).join(", ")
                          : "—"}
                      </div>
                    </td>
                    <td>
                      <span
                        className={styles.statusBadge}
                        style={{ backgroundColor: statusColors[app.status] }}
                      >
                        {statusLabels[app.status] || app.status}
                      </span>
                    </td>
                    <td className={styles.date}>{formatDate(app.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => fetchApplications(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className={styles.pageButton}
            >
              ← Назад
            </button>
            <span className={styles.pageInfo}>
              Страница {pagination.page} из {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchApplications(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className={styles.pageButton}
            >
              Вперед →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
