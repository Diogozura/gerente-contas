 
type Repo = {
  name: string
  stargazers_count: number
}
 
export const getServerSideProps = (async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo: Repo = await res.json()
  // Pass data to the page via props
  return {
     props: { repo }
     }
});
export default function Page({
  repo,
}) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  )
}