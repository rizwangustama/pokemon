'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import Popup from "@/app/components/popup";
import ImagePokemon from "@/app/components/imagePokemon";
// import {Pokemon} from "@/app/types/pokemon";

export const formatPokemonId = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop() || '0';
    // return id.padStart(3, '0');
    return id;
};

export default function PokemonList() {
    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [detailUrl, setDetailUrl] = useState<string>('');
    const [pokemonType, setPokemonType] = useState<any>();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<boolean>(false);
    const [sortByName, setSortByName] = useState('name');
    const [isTypeFilter, setIsTypeFilter] = useState<boolean>(false);

    // URL API awal
    const initialUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

    const handleIsDialog = (url: string) => {
        setIsDialogOpen(!isDialogOpen);
        setDetailUrl(url);
    }

    const handleIsTypeFilter =  () => {
        setIsTypeFilter(!isTypeFilter);
    }

    // Fungsi untuk memuat data dari API
    const fetchData = async (url : any) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();

            setPokemonData(data.results? data.results : data.pokemon); // Update data Pokémon
            console.log(data.pokemon);
            setNextUrl(data.next);        // Update URL halaman berikutnya
            setPreviousUrl(data.previous); // Update URL halaman sebelumnya
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSortBy = () => {
        setSortBy(!sortBy);
    }

    const fetchDataPokemonType = async (url : any) : Promise<void> => {
        try {
            const response: Response = await fetch(url);
            const data : any = await response.json();
            setPokemonType(data.results);
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleCategory = (url: string) : void  => {
        fetchData(url);
    }

    const handleSearch = (event : any) : void => {
        setSearchTerm(event.target.value);
    };

    const filteredPokemon = pokemonData.filter((pokemon: any) : any => {
        return pokemon?.name ? pokemon?.name.toLowerCase().includes(searchTerm.toLowerCase()) : pokemon?.pokemon?.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
    );

    const sortedPokemon = filteredPokemon.sort((a, b) => {
        // Sort based on sortBy and isAscending
        // @ts-ignore
        const valueA = a[sortByName] ? a[sortByName]  : a?.pokemon[sortByName];
        // @ts-ignore
        const ValueB = b[sortByName] ? b[sortByName] : b?.pokemon[sortByName];
        const comparison = valueA.localeCompare(ValueB);
        return sortBy ? comparison : -comparison;
    });

    useEffect(() => {
        fetchData(initialUrl);
        fetchDataPokemonType('https://pokeapi.co/api/v2/type')
    }, []);
    return (
        <>
            <main className={'bg-amber-50'}>
                <section className={'bg-[#EFF3F6]'}>
                    <div className={'container'}>
                        <div className={'flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between items-center py-20'}>
                            <h2 className={'w-full text-center lg:text-left lg:max-w-[250px] leading-tight text-[32px] font-bold text-[#2F3133]'}>Choose your Pokémon</h2>
                            <form className={'bg-white w-full lg:w-fit h-fit relative rounded-full overflow-hidden'}>
                                <input type={'text'}
                                       value={searchTerm} onChange={handleSearch}
                                       className={'bg-white outline-none py-4 pl-6 pr-14 w-full lg:w-[350px] text-sm placeholder:text-sm placeholder:text-[#A0AFBA] text-[#A0AFBA]'}
                                       placeholder={'input search Pokemon'}/>
                                <div
                                    className={'p-3 bg-[#E1E9EF] absolute top-1/2 -translate-y-1/2 right-[7px] rounded-full'}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.1931 2.72879C13.525 5.03385 13.525 8.7711 11.1931 11.0762C8.86132 13.3812 5.08069 13.3812 2.74887 11.0762C0.417045 8.7711 0.417045 5.03385 2.74887 2.72879C5.08069 0.423735 8.86132 0.423735 11.1931 2.72879"
                                            stroke="#3E75C3" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                        <path d="M11.1499 11.1096L16.9999 16.9716" stroke="#3E75C3" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className={'bg-white'}>
                    <div className={'container'}>
                        <div className={'flex flex-col lg:flex-row'}>
                            <div className={'w-full sm:w-3/12'}>
                                <div onClick={() => handleIsTypeFilter()} className={'flex gap-2 items-center py-6 lg:py-[47px]'}>
                                    <Image
                                        src="/icon-pokemon.svg"
                                        alt="Vercel Logo"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                    <h3 className={'text-lg font-semibold text-[#3E75C3]'}>Semua Type</h3>
                                </div>
                                <div className={isTypeFilter ? 'flex flex-col sm:border-r sm:border-r-slate-200 sm:pr-24' : 'hidden md:flex md:flex-col sm:border-r sm:border-r-slate-200 sm:pr-24' }>
                                    { pokemonType?.map((data : any, index : any) : any => {
                                            return (
                                                <div key={index} onClick={() => handleCategory(data?.url)} className={'capitalize cursor-pointer text-sm font-semibold text-[#ACB9C1] py-2.5 hover:text-[#3E75C3]'}>{data?.name}</div>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                            <div className={'w-full sm:w-9/12 lg:pl-[60px] xl:pl-[100px] 2xl:pl-[116px]'}>
                                <div className={'flex flex-row justify-between'}>
                                    <div className={'flex gap-4 items-center py-6 md:py-[47px]'}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.74228e-07 10C9.89033e-07 8.68678 0.258659 7.38642 0.761205 6.17316C1.26375 4.95991 2.00035 3.85752 2.92893 2.92893C3.85752 2.00034 4.95991 1.26375 6.17317 0.761203C7.38642 0.258656 8.68678 -9.89033e-07 10 -8.74228e-07C11.3132 -7.59423e-07 12.6136 0.258657 13.8268 0.761205C15.0401 1.26375 16.1425 2.00035 17.0711 2.92893C17.9997 3.85752 18.7362 4.95991 19.2388 6.17317C19.7413 7.38642 20 8.68678 20 10L10 10L8.74228e-07 10Z"
                                                fill="url(#paint0_linear_6830_27400)" fill-opacity="0.5"/>
                                            <circle cx="10" cy="10" r="9.25" stroke="#F33C3C" stroke-width="1.5"/>
                                            <circle cx="10.0001" cy="9.99989" r="2.88636" fill="#FEFEFE"
                                                    stroke="#F33C3C" stroke-width="1.5"/>
                                            <path d="M6.81818 10H0" stroke="#F33C3C" stroke-width="1.5"/>
                                            <path d="M18.8811 10L12.5874 10" stroke="#F33C3C" stroke-width="1.5"/>
                                            <defs>
                                                <linearGradient id="paint0_linear_6830_27400" x1="23" y1="-9.31315e-07"
                                                                x2="-3" y2="9.5" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#F33C3C"/>
                                                    <stop offset="1" stop-color="#F33C3C" stop-opacity="0"/>
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <h3 className={'text-lg text-[#4D5053] font-semibold'}>Pokémons</h3>
                                    </div>

                                    <div onClick={() => handleSortBy()} className={'flex gap-4 items-center py-6 md:py-[47px] cursor-pointer'}>
                                        <svg width="10" height="16" viewBox="0 0 10 16" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.92308 0L9.84615 6.76923H0L4.92308 0Z" fill="#3E75C3" opacity={sortBy ? '1' : '0.5'}/>
                                            <path opacity={!sortBy ? '1' : '0.5'}
                                                  d="M4.92311 16L3.69646e-05 9.23077L9.84619 9.23077L4.92311 16Z"
                                                  fill="#3E75C3"/>
                                        </svg>

                                        <h3>Urutkan Berdasarkan</h3>
                                    </div>
                                </div>
                                <div className={'grid  grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-6 xl:gap-8 pb-16'}>
                                    {
                                        sortedPokemon.map((data: any, index: any) => {
                                            const pokemonId = formatPokemonId(data.url ? data.url : data?.pokemon?.url);
                                            return (
                                                <>
                                                    <div className={'bg-white p-6 rounded-xl card-shadow'}
                                                         key={index}
                                                         onClick={() => handleIsDialog(data.url ? data?.url : data?.pokemon?.url)}>
                                                        <ImagePokemon pokemonId={pokemonId} pokemonName={ data.name ? data?.name : data?.pokemon?.name } />
                                                        {/*<img*/}
                                                        {/*    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`}*/}
                                                        {/*    alt={data.name ? data.name : data.pokemon?.name}/>*/}
                                                        <h4 className={'text-xs text-[#7A7D80]'}>#{pokemonId}</h4>
                                                        <h2 className={'text-lg font-semibold text-[#2F3133] capitalize'}>{data.name ? data.name : data?.pokemon?.name}</h2>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div className={'flex justify-center'}>
                                    <button
                                        onClick={() => previousUrl && fetchData(previousUrl)}
                                        disabled={!nextUrl}
                                        style={{marginLeft: "10px"}}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => nextUrl && fetchData(nextUrl)}
                                        disabled={!nextUrl}
                                        style={{marginLeft: "10px"}}
                                    >
                                        Next
                                    </button>
                                    <div id={'dialog'} className={isDialogOpen ? 'flex justify-center items-end md:items-center fade-in' : 'hidden'}>
                                        <div className={'bg-white w-full md:w-fit md:min-w-[710px] h-fit rounded-2xl relative'}>
                                            <Popup title={'hello world'} url={detailUrl} isVisibility={isDialogOpen}/>
                                            <button className={'absolute bottom-full right-0 mb-2.5 bg-white'}
                                                    onClick={() => handleIsDialog('')}>
                                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.25 4.75L4.75 14.25" stroke="#4D5053" stroke-width="2"
                                                          stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M4.75 4.75L14.25 14.25" stroke="#4D5053" stroke-width="2"
                                                          stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
