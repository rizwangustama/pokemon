export const formatPokemonId = (url : string) : string => {
    console.log(url);
    const id = url.split('/').filter(Boolean).pop() || '0';
    // return id.padStart(3, '0');
    return id;
}
