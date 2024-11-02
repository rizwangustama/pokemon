export const formatSpasi = (value: string | undefined) => {
    const x = (value ?? '').split('-');
    const z = x.join(' ');
    return z;
}
