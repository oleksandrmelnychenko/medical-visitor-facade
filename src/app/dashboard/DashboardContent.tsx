"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  LogOut,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  Plus,
  Settings,
  HelpCircle,
  Mail,
  Phone,
  User,
  Zap,
  RefreshCw,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./dashboard.module.scss";

interface DashboardContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    role?: string;
  };
}

type Application = {
  id: string;
  applicationNum: string;
  status: string;
  createdAt: string;
  preferredCity: { nameRu: string } | null;
  services: Array<{ service: { nameRu: string } }>;
};

const statusConfig: Record<string, { label: string; class: string }> = {
  NEW: { label: "Новая", class: "new" },
  IN_REVIEW: { label: "На рассмотрении", class: "inReview" },
  CONTACTED: { label: "Связались", class: "contacted" },
  IN_PROGRESS: { label: "В работе", class: "inProgress" },
  COMPLETED: { label: "Завершена", class: "completed" },
};

export function DashboardContent({ user }: DashboardContentProps) {
  const t = useTranslations("dashboard");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications?limit=5");
      const data = await response.json();
      if (data.data) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  const getInitials = (name: string | null | undefined, email: string | null | undefined) => {
    if (name) {
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Сегодня";
    if (days === 1) return "Вчера";
    if (days < 7) return `${days} дн. назад`;

    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const today = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const stats = {
    total: applications.length,
    new: applications.filter((a) => a.status === "NEW").length,
    inProgress: applications.filter((a) => ["IN_REVIEW", "CONTACTED", "IN_PROGRESS"].includes(a.status)).length,
    completed: applications.filter((a) => a.status === "COMPLETED").length,
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <RefreshCw className={styles.spinner} size={32} />
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            G<span>MED</span>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.userButton}>
              <div className={styles.userAvatar}>
                {getInitials(user.name, user.email)}
              </div>
              <span className={styles.userName}>{user.name || user.email}</span>
            </div>
            <button onClick={handleSignOut} className={styles.logoutButton}>
              <LogOut size={16} />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Welcome Section */}
        <section className={styles.welcomeSection}>
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeContent}>
              <div className={styles.welcomeText}>
                <h1>Добро пожаловать, {user.name || "Пользователь"}!</h1>
                <p>Здесь вы можете отслеживать свои заявки и управлять услугами</p>
              </div>
              <div className={styles.welcomeDate}>
                <Calendar size={18} />
                <span>{today}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={cn(styles.statIcon, styles.blue)}>
              <FileText />
            </div>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Всего заявок</div>
          </div>
          <div className={styles.statCard}>
            <div className={cn(styles.statIcon, styles.amber)}>
              <Clock />
            </div>
            <div className={styles.statValue}>{stats.new}</div>
            <div className={styles.statLabel}>Новых</div>
          </div>
          <div className={styles.statCard}>
            <div className={cn(styles.statIcon, styles.purple)}>
              <Zap />
            </div>
            <div className={styles.statValue}>{stats.inProgress}</div>
            <div className={styles.statLabel}>В работе</div>
          </div>
          <div className={styles.statCard}>
            <div className={cn(styles.statIcon, styles.green)}>
              <CheckCircle2 />
            </div>
            <div className={styles.statValue}>{stats.completed}</div>
            <div className={styles.statLabel}>Завершено</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Applications List */}
          <div className={styles.applicationsCard}>
            <div className={styles.cardHeader}>
              <h2>
                <FileText size={18} />
                Мои заявки
              </h2>
              {user.role === "ADMIN" || user.role === "MANAGER" ? (
                <Link href="/admin" className={styles.viewAllLink}>
                  Админ-панель <ChevronRight size={16} />
                </Link>
              ) : (
                applications.length > 0 && (
                  <span className={styles.viewAllLink}>
                    Все заявки <ChevronRight size={16} />
                  </span>
                )
              )}
            </div>
            <div className={styles.applicationsList}>
              {applications.length === 0 ? (
                <div className={styles.emptyState}>
                  <Inbox />
                  <p>У вас пока нет заявок</p>
                </div>
              ) : (
                applications.slice(0, 5).map((app) => (
                  <div key={app.id} className={styles.applicationItem}>
                    <div className={styles.applicationInfo}>
                      <div className={styles.applicationIcon}>
                        <FileText size={18} />
                      </div>
                      <div className={styles.applicationDetails}>
                        <h3>{app.applicationNum}</h3>
                        <p>
                          {app.preferredCity?.nameRu || "—"}
                          {app.services.length > 0 && ` • ${app.services.length} услуг`}
                        </p>
                      </div>
                    </div>
                    <div className={styles.applicationStatus}>
                      <span
                        className={cn(
                          styles.statusBadge,
                          styles[statusConfig[app.status]?.class || "new"]
                        )}
                      >
                        {statusConfig[app.status]?.label || app.status}
                      </span>
                      <span className={styles.applicationDate}>
                        {formatDate(app.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Quick Actions */}
            <div className={styles.quickActionsCard}>
              <h3 className={styles.quickActionsTitle}>
                <Zap size={18} />
                Быстрые действия
              </h3>
              <div className={styles.quickActionsList}>
                <Link href="/" className={styles.quickActionButton}>
                  <Plus />
                  <span>Новая заявка</span>
                </Link>
                <button className={styles.quickActionButton}>
                  <Settings />
                  <span>Настройки</span>
                </button>
                <button className={styles.quickActionButton}>
                  <HelpCircle />
                  <span>Помощь</span>
                </button>
              </div>
            </div>

            {/* Profile Card */}
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                  {getInitials(user.name, user.email)}
                </div>
                <div className={styles.profileInfo}>
                  <h3>{user.name || "Пользователь"}</h3>
                  <p>{user.role === "ADMIN" ? "Администратор" : user.role === "MANAGER" ? "Менеджер" : "Клиент"}</p>
                </div>
              </div>
              <div className={styles.profileDetails}>
                {user.email && (
                  <div className={styles.profileRow}>
                    <Mail />
                    <span>{user.email}</span>
                  </div>
                )}
                {user.phone && (
                  <div className={styles.profileRow}>
                    <Phone />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className={styles.profileRow}>
                  <User />
                  <span>ID: {user.id?.slice(0, 8)}...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
