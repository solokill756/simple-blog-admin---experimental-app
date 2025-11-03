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
      title?: string;
      description?: string;
      addPost?: string;
      edit?: string;
      delete?: string;
      confirmDelete?: string;
      notFound?: string;
      noTitle?: string;
      noContent?: string;
      deleteSuccess?: string;
      deleteFailed?: string;
      deleteError?: string;
      deleteTimeout?: string;
      readMore?: string;
      loading?: string;
    };
    postDetail?: {
      loading?: string;
    };
  };
}
