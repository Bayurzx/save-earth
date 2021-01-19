import Layout from './Layout';
import { posts } from '../apis';
import { useState, useEffect } from 'react';
import Card from './Card';


const Home = () => {
  const [animal, setAnimal] = useState([]);
  const [plant, setPlant] = useState([]);
  // separating animal from plants
  const plants = []
  const animals = []

  const loadAnimalData = () => {
    posts()
    .then((response) => {
      if (response.error) {
        console.log(response.error)
      } else {
        response.map((item) => {
          if (item.ofClass === "1") {
            animals.push(item)
          }
        })
        setAnimal(animals)
      }
    })
  }

  const loadPlantData = () => {
    posts()
    .then((response) => {
      if (response.error) {
        console.log(response.error)
      } else {
        response.map((item) => {
          if (item.ofClass === "0") {
            plants.push(item)
          }
        })
        setPlant(plants)
      }
    })
  }

  useEffect(() => {
    loadPlantData();
    loadAnimalData();
  }, [])

  return (
    <Layout title="Save Earth" description="Discover Wildlife and Plants" className="container-fluid">
      <h2 className="mb-4">Animals</h2>
      <div className="row">
        { animal.map((d, i) => (
            <Card key={i} detail={d}/>
        )) }
      </div>

      <h2 className="mb-4">Plants</h2>
      <div className="row">
        { plant.map((d, i) => (
          <Card key={i} detail={d}/>
        )) }
      </div>
    </Layout>

  );
}

export default Home;
