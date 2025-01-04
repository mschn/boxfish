export function setDarkTheme(darkMode: boolean) {
  const element = document.querySelector('html');
  element?.classList[darkMode ? 'add' : 'remove']('dark');
}

export function isDarkTheme(): boolean {
  const hasDarkClass =
    document.querySelector('html')?.classList.contains('dark') ?? false;
  return (
    window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches || hasDarkClass
  );
}
