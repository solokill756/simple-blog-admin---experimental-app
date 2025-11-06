export interface DictType {
  homepage?: {
    title?: string;
    greeting?: string;
    viewPosts?: string;
  };
  languageSwitcher?: {
    label?: string;
  };
  common?: {
    back?: string;
  };
  dashboard?: {
    posts?: {
      label?: string;
      title?: string;
      description?: string;
      addPost?: string;
      addNewPost?: string;
      editPost?: string;
      edit?: string;
      delete?: string;
      confirmDelete?: string;
      notFound?: string;
      noTitle?: string;
      noContent?: string;
      invalidId?: string;
      deleteSuccess?: string;
      deleteFailed?: string;
      deleteError?: string;
      deleteTimeout?: string;
      readMore?: string;
      loading?: string;
      formDescription?: string;
      formTitle?: string;
      formContent?: string;
      cancel?: string;
      errorsMessages?: {
        missingFields?: string;
        updateFailed?: string;
        notFound?: string;
        server_error?: string;
      };
      successMessages?: {
        createSuccess?: string;
        updateSuccess?: string;
      };
    };
    postDetail?: {
      loading?: string;
    };
  };
}
