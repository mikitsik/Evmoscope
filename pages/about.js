import { Layout } from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <h2>Hello everyone!</h2>
      <p>I developed this app within ten days before the hackathon ends. It is just a sketch written on the nextjs. In order to become a full-fledged application it is necessary to make the right architecture, apply the necessary tools and make a proper design. Due to winners announcement on or around October 10, 2022 this app is going to be under active development. Thank you! </p>
      <h3>TODO</h3>
      <p>Core improvements and refactoring</p>
      <ul>
        <li>consult with the best devs on architecture and business logic of the app and its development</li>
        <li>to avoid redundant fetch queries via network and to have all the nessesary data run a mainnet node</li>
        <li>develop light-weight backend server or middleware to collect and show nessesary data as smart-contracts, total counts etc.</li>
        <li>implement postgresql and redis for quick data fetches</li>
        <li>implement graphql or ruby hotwire</li>
        <li>cover most part of code with tests, make permanent codereview</li>
      </ul>
      <p>Add features</p>
      <ul>
        <li>search address, txs, block, contract bar</li>
      </ul>

    </Layout>
  )
}
