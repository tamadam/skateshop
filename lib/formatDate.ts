export const formatDate = (date: Date, locale: string) => {
    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
};