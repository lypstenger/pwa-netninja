// offline data
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    // prob multiple tabs open
    console.log("persistance failed");
  } else if (err.code == "unimplemented") {
    // lack of browser support
    console.log("persistance is not available");
  } else {
    console.log(err);
  }
});

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
      removeRecipe(change.d_.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector("form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection("recipes")
    .add(recipe)
    .catch((err) => console.log(err));

  form.title.value = "";
  form.ingredients.value = "";
});

const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (evt) => {
  //   console.log(evt);
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  }
});
