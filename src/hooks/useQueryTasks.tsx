import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";
import { useEffect, useState } from "react";
import { TaskDataTypes } from "../@types/tasks";
import { updateDate3HoursAgo } from "../utils/updateDate3HoursAgo";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserDataTypes } from "../@types/userData";

type FilterType = "all" | "pending" | "completed" | "late";

export function useQueryTasks() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState<FilterType>("all");

  const navigate = useNavigate();
  const searchParams = useSearchParams();

  async function getTasks({ page = 1, limit = 10, filter = "all" }) {
    if (page <= 0) page = 1;
    const offset = limit * (page - 1);

    await changeTotalPages(filter, limit);

    const { data } = await API.get(
      `/tasks?limit=${limit}&offset=${offset}&filter=${filter}`
    );

    const tasksUpdatedDate = data.userTasks.map((task: TaskDataTypes) => {
      const updatedDate = updateDate3HoursAgo(new Date(task.date)).toISOString();
      return {
        ...task,
        date: updatedDate,
      };
    });

    return tasksUpdatedDate as TaskDataTypes[];
  }

  function nextPage() {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      navigate(`?filter=${filter}&page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      navigate(`?filter=${filter}&page=${page - 1}`);
    }
  }

  function changePage(value: number) {
    setPage(value);
  }

  function changeLimit(value: number) {
    setLimit(value);
  }

  function changeFilter(value: FilterType) {
    setFilter(value);
  }

  async function changeTotalPages(filter = "all", limit: number) {
    const { data } = await API.get("/user");
    const { tasksInfo } = data as UserDataTypes;

    const totalAll = tasksInfo.total;
    const totalCompleted = tasksInfo.completed;
    const totalPending = tasksInfo.pending;
    const totalLate = tasksInfo.pending;

    let total;
    switch (filter) {
      case "all":
        total = totalAll;
        break;
      case "completed":
        total = totalCompleted;
        break;
      case "pending":
        total = totalPending;
        break;
      case "late":
        total = totalLate;
        break;

      default:
        total = totalAll;
        break;
    }

    const calcTotalPages = Math.ceil(total / limit);
    if (calcTotalPages != totalPages) setTotalPages(calcTotalPages);
  }

  useEffect(() => {
    const pageQuery = Number(searchParams[0].get("page"));
    const filterQuery = searchParams[0].get("filter") as FilterType;

    setPage(pageQuery || 1);
    setFilter(filterQuery || "all");

    if (totalPages > 0) {
      if (pageQuery > totalPages) {
        navigate(`?filter=${filterQuery}&page=${totalPages}`);
        setPage(totalPages);
        return;
      }

      if (pageQuery < 1) {
        navigate(`?filter=${filterQuery}&page=1`);
        setPage(1);
        return;
      }
    }
  }, [page, totalPages, searchParams, navigate]);

  const query = useQuery({
    queryKey: ["tasksData", page, limit, filter],
    queryFn: () => getTasks({ page, limit, filter }),
  });

  const refetchQueryTask = async () => await query.refetch();

  return {
    ...query,
    data: query.data,
    refetchQueryTask,
    page,
    totalPages,
    nextPage,
    prevPage,
    changePage,
    changeLimit,
    changeFilter,
  };
}
