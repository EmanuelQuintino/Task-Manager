import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";
import { useState } from "react";
import { TaskDataTypes } from "../@types/tasks";

type FilterType = "all" | "pending" | "completed";

export function useQueryTasks() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState<FilterType>("all");

  async function getTasks({ page = 1, limit = 10, filter = "all" }) {
    if (page <= 0) page = 1;
    const offset = limit * (page - 1);

    const { data } = await API.get(
      `/tasks?limit=${limit}&offset=${offset}&filter=${filter}`
    );

    await changeTotalPages();

    const tasksUpdatedDate = data.userTasks.map((task: TaskDataTypes) => {
      const updatedDate = new Date(
        new Date(task.date).getTime() - 1000 * 60 * 60 * 3
      ).toISOString();
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
    }
  }

  function prevPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
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

  async function changeTotalPages() {
    const { data } = await API.get("/user");

    const total = data.tasksInfo.total;
    const calcTotalPages = Math.ceil(total / limit);

    if (calcTotalPages != totalPages) setTotalPages(calcTotalPages);
  }

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
