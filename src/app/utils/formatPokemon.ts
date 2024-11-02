export const formatPokemon = (value: number | string): string => {
    if (value !== undefined && value !== null) {
        return value.toString().padStart(3, '0');
    }
    return '000';
};
