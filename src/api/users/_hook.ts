import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersRequest } from "./_request";
import type {
  CreateUserRequest,
  UpdateUserRequest,
} from "../../types/user.types";

// کلید مشترک Cache برای این ماژول — همه‌جا از همین آرایه استفاده کنید
// تا Invalidate کردن بعد از Create/Update/Delete همیشه درست کار کند.
export const usersQueryKeys = {
  all: ["users"] as const,
  detail: (id: number) => ["users", id] as const,
};

// ── Queries ──────────────────────────────────────────────────────

export function useUsersListQuery() {
  return useQuery({
    queryKey: usersQueryKeys.all,
    queryFn: () => usersRequest.getList().then((res) => res.data),
  });
}

export function useUserByIdQuery(id: number | undefined) {
  return useQuery({
    queryKey: usersQueryKeys.detail(id ?? 0),
    queryFn: () => usersRequest.getById(id!).then((res) => res.data),
    enabled: !!id,
  });
}

// ── Mutations ────────────────────────────────────────────────────
// هر Mutation بعد از موفقیت، لیست کاربران را Invalidate می‌کند تا UI خودکار به‌روز شود.

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserRequest) =>
      usersRequest.create(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
      usersRequest.update(id, data).then((res) => res.data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => usersRequest.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
    },
  });
}
