export const timestampToDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
  };