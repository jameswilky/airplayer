export default () => {
  const ua = navigator.userAgent;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      ua
    ) &&
    /Chrome|Safari/i.test(ua)
  )
    return true;
  else return false;
};
