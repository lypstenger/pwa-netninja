// real-time listener
db.collection("recipes").onSnapshot((snapshot) => {
  //   console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    console.log(change.d_, change.d_.doc.data(), change.d_.doc.id);
    if (change.d_.type === "added") {
      // add the document to the web page
      renderRecipe(change.d_.doc.data(), change.d_.doc.id);
    }
    if (change.d_.type === "removed") {
    }
  });
});
