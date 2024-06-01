import { useMutation } from "@tanstack/react-query";
import { API } from "../configs/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { TaskDataTypes } from "../@types/tasks";

async function createTask(data: TaskDataTypes) {
  const { title, description, date, status } = data;

  return await API.post("/task", { title, description, date, status });
}

export const useTaskCreate = () => {
  const mutate = useMutation({
    mutationFn: createTask,
    onSuccess: (response) => {
      toast.dismiss();
      toast.success(response.data.message || "Tarefa criada com sucesso!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || "Um erro inesperado aconteceu ao criar tarefa!"
      );
    },
  });

  return mutate;
};