export default function sanitize(value: string): string {
    if (value) {
        return value.replaceAll(/'/gi, '´').replaceAll('\\', '');
    }
    return '';
}
