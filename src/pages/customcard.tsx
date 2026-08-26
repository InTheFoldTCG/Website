const handleSubmitAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sendData = async (fileData = "", fileName = "", mimeType = "") => {
      try {
        const endpoint = "https://script.google.com/macros/s/AKfycbxEruHChA6OB01-6bA9lXBasy-pU9HtLK4mzS4W0xVkyFBV9g63J9FHOWU_4T7Si5Uu/exec";
        const orderId = `ITF-${Math.floor(100000 + Math.random() * 900000)}`;

        const primaryOrder = {
          orderId: orderId,
          customerName: customerName,
          customerEmail: customerEmail,
          cardName: cardName,
          attackName: attackName,
          cardType: cardType,
          pokemonType: pokemonType,
          holoAddon: hasHolo ? "Yes" : "No",
          holderAddon: hasHolder ? "Yes" : "No",
          totalPrice: `Primary Card`,
          fileData: fileData,
          fileName: fileName,
          mimeType: mimeType
        };

        await fetch(endpoint, {
          method: "POST",
          redirect: "follow",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(primaryOrder),
        });

        if (hasDuplicate) {
          const duplicateOrder = {
            orderId: orderId,
            customerName: customerName,
            customerEmail: customerEmail,
            cardName: cardName,
            attackName: attackName,
            cardType: cardType,
            pokemonType: pokemonType,
            holoAddon: dupHolo ? "Yes" : "No",
            holderAddon: dupHolder ? "Yes" : "No",
            totalPrice: `Duplicate Card`,
            fileData: fileData,
            fileName: fileName,
            mimeType: mimeType
          };

          await fetch(endpoint, {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(duplicateOrder),
          });
        }

        setIsSubmitting(false);
        setSubmitted(true);
      } catch (error) {
        console.error("Order submission failed", error);
        setIsSubmitting(false);
        alert("Something went wrong saving your order. Please try again.");
      }
    };

    if (photo) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        sendData(base64String, photo.name, photo.type);
      };
      reader.readAsDataURL(photo);
    } else {
      sendData();
    }
  };
