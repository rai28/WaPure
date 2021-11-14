import React from "react";
import Card from "./Card";
import wqtest from "../../assets/images/wqtest.jpeg";
import wqcert from "../../assets/images/wqcert.png";
import hservice from "../../assets/images/hservice.jpg";

export default function CardContent() {
  return (
    <div className="wrapper">
      <Card
        img={wqtest}
        title="Water Quality Tests"
        description="Get your water sample tests done with use in a minute.
        We give instant and accurate results based on our pre-tained models.
        Get your tests done at no cost"
      />

      <Card
        img={wqcert}
        title="Certifications"
        description="We offer our own cerifications baesed on the quality check.
        Be one with us and get your customers and clients certified.
        Get detailed reports of every sample and suggestions for free."
      />

      <Card
        img={hservice}
        title="At Home Service"
        description="Don’t have proper equipments ?
        We are planning to offer door door tests. No need to pay for hardwares.
        If you want us to be in your city. Let us Know."
      />
    </div>
  );
}
