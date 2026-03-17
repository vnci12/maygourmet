function supprimer(id) {
    const routeComplete = '/api/equipe/' + id;
    fetch(
        routeComplete, { method: "DELETE" }
    ).then(
            (response) => response.json()
    ).then(
            (donnee) => window.location.href = donnee.routeAcceuil
    ).catch(
            (error) => console.log(error)
    )
};