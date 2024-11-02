import { useEffect, useState } from "react";

export default function ImagePokemon({ pokemonId, pokemonName }: { pokemonId: string | number; pokemonName: string }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`; // Construct image URL directly

        img.onload = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)

        };

        img.onerror = () => {
            setIsLoading(false); // Set loading to false on error as well
        };

        return () => {
            img.onload = img.onerror = null; // Clean up event listeners
        };
    }, [pokemonId]); // Re-run effect only when pokemonId changes

    return (
        <div className={'lg:h-[215px] relative'}>
            {
                isLoading ? (<div className={'flex justify-center items-center w-full h-[150px]'}>
                    <span className={'loader'}></span>
                </div>) : (
                    // <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`}
                    //      alt={pokemonName}/>

                <img className={'h-full'} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
             alt={pokemonName}/>
    )
}
</div>
)
    ;
}
