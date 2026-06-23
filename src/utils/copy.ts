import Clipboard from "clipboard";

export async function copy(text: string, container?: Element | null) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  } else {
    try {
      Clipboard.copy(text, { container: container || document.body });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
