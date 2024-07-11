import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Card = ({ addFav }) => {
    const [datos, setDatos] = useState([]);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        let request = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://www.swapi.tech/api/people", request)
            .then((resp) => resp.json())
            .then((result) => { setDatos(result) })
            .catch(error => {
                console.log(error, "este es el error");
            });

        fetch("https://www.swapi.tech/api/planets", request)
            .then((resp) => resp.json())
            .then((result) => { setPlanets(result) })
            .catch(error => {
                console.log(error, "este es el error");
            });
    }, []);

    return (
        <>
            <div className="container my-5">
                <div>
                    
                </div>
                <h2 className="text-white mb-3">Characters</h2>
                <div className="overflow-scroll-horizontal">
                    {datos?.results?.map((element, key) => (
                        <div className="card m-2 d-inline-block card-custom" key={key}>
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${key + 1}.jpg`}
                                className="card-img-top"
                                alt={element.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{element?.name}</h5>
                                <p className="card-text">Gender: {element?.gender}</p>
                                <p className="card-text">Hair Color: {element?.hair_color}</p>
                                <p className="card-text">Eye Color: {element?.eye_color}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/detalles/${key + 1}`} className="btn btn-dark">Learn More!</Link>
                                    <button
                                        type="button"
                                        onClick={() => addFav(element.name)}
                                        className="btn btn-warning"
                                    >
                                        ❤️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container my-5">
                <h2 className="text-white mb-3">Planets</h2>
                <div className="overflow-scroll-horizontal">
                    {planets?.results?.map((element, key) => (
                        <div className="card m-2 d-inline-block card-custom" key={key}>
                            <img
                                src={`https://starwars-visualguide.com/assets/img/planets/${key + 1}.jpg`}
                                className="card-img-top"
                                alt={element.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{element?.name}</h5>
                                <p className="card-text">Population: {element?.population}</p>
                                <p className="card-text">Terrain: {element?.terrain}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/planet/${key + 1}`} className="btn btn-dark">Learn More!</Link>
                                    <button
                                        type="button"
                                        onClick={() => addFav(element.name)}
                                        className="btn btn-warning"
                                    >
                                        ❤️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
