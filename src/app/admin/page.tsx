"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { RefreshCw, FileText, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./admin.module.scss";

type Application = {
  id: string;
  applicationNum: string;
  status: string;
  isEuResident: boolean | null;
  clientNotes: string | null;
  createdAt: string;
  user: {
    id: string;
    email: string;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  location: { code: string; nameRu: string } | null;
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
  COMPLETED: "#10b981",
  CANCELLED: "#ef4444",
};

const statusLabelKeys: Record<string, string> = {
  NEW: "statusNew",
  IN_REVIEW: "statusInReview",
  CONTACTED: "statusContacted",
  COMPLETED: "statusCompleted",
  CANCELLED: "statusCancelled",
};

const serviceLabelKeys: Record<string, string> = {
  charter: "serviceCharter",
  transport: "serviceTransport",
  visa: "serviceVisa",
  translator: "serviceTranslator",
  hotel: "serviceHotel",
};

export default function AdminPage() {
  const t = useTranslations("admin");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSelectedApp(null);
      }
    };

    if (selectedApp) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedApp]);

  const allStatuses = [
    "NEW",
    "IN_REVIEW",
    "CONTACTED",
    "COMPLETED",
    "CANCELLED",
  ] as const;

  const allServices = [
    { code: "charter", labelKey: "serviceCharter" },
    { code: "transport", labelKey: "serviceTransport" },
    { code: "visa", labelKey: "serviceVisa" },
    { code: "translator", labelKey: "serviceTranslator" },
    { code: "hotel", labelKey: "serviceHotel" },
  ];

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

      if (response.status === 401) {
        router.push("/login");
        return;
      }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateStatus = async (appId: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const response = await fetch(`/api/applications/${appId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      // Update local state
      const updatedApp = data.data;
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? updatedApp : app))
      );
      setSelectedApp(updatedApp);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка обновления статуса");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className={styles.loadingContainer}>
        <RefreshCw className={styles.spinner} size={32} />
        <p>{t("loading")}</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            ref={sidebarRef}
            className={styles.sidebar}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.sidebarHeader}>
              <h3>{t("applicationNum", { num: selectedApp.applicationNum })}</h3>
              <button onClick={() => setSelectedApp(null)} className={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
          <div className={styles.sidebarContent}>
            {/* Status Selector */}
            <div className={styles.statusSection}>
              <h4 className={styles.sectionTitle}>{t("status")}</h4>
              <div className={styles.statusGrid}>
                {allStatuses.map((statusKey) => (
                  <button
                    key={statusKey}
                    className={`${styles.statusButton} ${selectedApp.status === statusKey ? styles.statusButtonActive : ""}`}
                    style={{
                      "--status-color": statusColors[statusKey],
                    } as React.CSSProperties}
                    onClick={() => updateStatus(selectedApp.id, statusKey)}
                    disabled={updatingStatus || selectedApp.status === statusKey}
                  >
                    <span
                      className={styles.statusDot}
                      style={{ backgroundColor: statusColors[statusKey] }}
                    />
                    {t(statusLabelKeys[statusKey])}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className={styles.servicesSection}>
              <h4 className={styles.sectionTitle}>{t("services")}</h4>
              <div className={styles.servicesList}>
              {allServices.map((service) => {
                const isSelected = selectedApp.services.some(
                  (s) => s.service.code === service.code
                );
                return (
                  <div key={service.code} className={styles.serviceItem}>
                    <span className={isSelected ? styles.checkboxChecked : styles.checkboxUnchecked}>
                      {isSelected && <Check size={12} />}
                    </span>
                    <span className={isSelected ? styles.serviceSelected : styles.serviceLabel}>
                      {t(service.labelKey)}
                    </span>
                  </div>
                );
              })}
              </div>
            </div>

            {/* Client Notes */}
            {selectedApp.clientNotes && (
              <div className={styles.notesSection}>
                <h4 className={styles.notesTitle}>{t("clientNotes")}</h4>
                <p className={styles.notesText}>{selectedApp.clientNotes}</p>
              </div>
            )}
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            <h2>{t("applications")}</h2>
            <div className={styles.statsInline}>
              <span><strong>{pagination?.total || 0}</strong> {t("total")}</span>
              <span><strong>{applications.filter((a) => a.status === "NEW").length}</strong> {t("new")}</span>
            </div>
          </div>
          <button onClick={() => fetchApplications(pagination?.page || 1)} className={styles.refreshButton}>
            <RefreshCw size={18} />
            {t("refresh")}
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {/* Status Legend */}
        <div className={styles.statusLegend}>
          {Object.entries(statusLabelKeys).map(([key, labelKey]) => (
            <div key={key} className={styles.legendItem}>
              <span
                className={styles.statusDot}
                style={{ backgroundColor: statusColors[key] }}
              />
              <span className={styles.legendLabel}>{t(labelKey)}</span>
            </div>
          ))}
        </div>

        {applications.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={48} />
            <p>{t("noApplications")}</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>{t("tableNumber")}</th>
                  <th>{t("tableClient")}</th>
                  <th>{t("tablePhone")}</th>
                  <th>{t("tableEmail")}</th>
                  <th>{t("tableFrom")}</th>
                  <th>{t("tableCreated")}</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} onClick={() => setSelectedApp(app)} className={selectedApp?.id === app.id ? styles.selectedRow : ''}>
                    <td className={styles.statusCell}>
                      <span
                        className={styles.statusDot}
                        style={{ backgroundColor: statusColors[app.status] }}
                        title={t(statusLabelKeys[app.status]) || app.status}
                      />
                    </td>
                    <td className={styles.appNum}>{app.applicationNum}</td>
                    <td>
                      <div className={styles.clientName}>
                        {app.user.firstName} {app.user.lastName}
                      </div>
                    </td>
                    <td className={styles.phone}>{app.user.phone || "—"}</td>
                    <td className={styles.email}>{app.user.email || "—"}</td>
                    <td>{app.location?.nameRu || "—"}</td>
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
              ← {t("prev")}
            </button>
            <span className={styles.pageInfo}>
              {t("pageInfo", { page: pagination.page, totalPages: pagination.totalPages })}
            </span>
            <button
              onClick={() => fetchApplications(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className={styles.pageButton}
            >
              {t("next")} →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
