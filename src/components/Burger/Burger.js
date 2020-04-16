import React from "react";
import classes from "./Burger.sass";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igName) => {
      return [...Array(props.ingredients[igName])].map((_, i) => {
        return <BurgerIngredient key={igName + i} type={igName} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length <= 0) {
    transformedIngredients = (
      <div className={classes.notfound}>Ингредиенты не найдены</div>
    );
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
