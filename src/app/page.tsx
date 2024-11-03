import Image from 'next/image'
import Carousel from "@/app/components/carousel";
import Header from "@/app/components/header";
import PokemonList from "@/app/components/pokemonList";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
      <>
          <Header/>
          <Carousel/>
          <PokemonList/>
          <Footer/>
      </>

  )
}
