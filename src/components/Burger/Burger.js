import React from "react";
import classes from "./Burger.sass";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(
    (igName) => {
      return [...Array(props.ingredients[igName])].map((_, i) => {
        return <BurgerIngredient key={igName + i} type={igName} />;
      });
    }
  );
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
