let notifier = null;

export const setNotifier = (api) => {
  notifier = api;
};

export const showError = (message) => {
  notifier?.showError(message);
};

export const showSuccess = (message) => {
  notifier?.showSuccess(message);
};
