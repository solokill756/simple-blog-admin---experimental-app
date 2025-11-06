export interface UpdateAndAddState {
  errors?: {
    id?: string[];
    title?: string[];
    body?: string[];
  };
  message?: string;
}
