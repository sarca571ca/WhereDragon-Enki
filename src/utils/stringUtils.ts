export function formatCampHeadings(campHeading: string): string {
    const text = campHeading.slice(0, 48);
    const dashCount = (54 - text.length) * .5;
    return `-`.repeat(dashCount) + ` ` + text + ` ` + `-`.repeat(dashCount);
}

