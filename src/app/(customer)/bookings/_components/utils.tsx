export const getSeaConditionInfo = (condition: string) => {
    switch (condition) {
        case "CALM":
            return {
                color: "text-emerald-500",
                bgColor: "bg-green-100",
                label: "Calm",
            };
        case "SLIGHTLY_ROUGH":
            return {
                color: "text-yellow-500",
                bgColor: "bg-yellow-100",
                label: "Slightly Rough",
            };
        case "ROUGH":
            return {
                color: "text-orange-500",
                bgColor: "bg-orange-100",
                label: "Rough",
            };
        case "VERY_ROUGH":
            return {
                color: "text-purple-700",
                bgColor: "bg-purple-100",
                label: "Very Rough",
            };
        default:
            return {
                color: "text-gray-500",
                bgColor: "bg-gray-100",
                label: "Unknown",
            };
    }
};

export const formatName = (name: string) => {
    return name
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
}
