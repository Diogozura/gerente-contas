import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LinkPage from '../src/components/Link'
import styles from '../styles/Home.module.css'



export default function Home() {
  return (
    <>
      <h1>Bem vindo a home</h1>
     <LinkPage  href={'/sala'} name={'sala'} />
    </>
  )
}