const handleSerachInputs = (input) => {
    if (input === "name") {
      // setUser(user.meliCode = '');
      // setUser(user.personalCode = '');
      setOnDisabled({
        meliCode: true,
        personalCode: true,
        userName: false,
      });
    } else if (input === "melliCode") {
      // setUser(user.userName = '');
      // setUser(user.personalCode = '');
      setOnDisabled({
        meliCode: false,
        personalCode: true,
        userName: true,
      });
    } else if (input === "personalCode") {
      // setUser(user.userName = '');
      // setUser(user.meliCode = '');
      setOnDisabled({
        meliCode: true,
        personalCode: false,
        userName: true,
      });
    }
  };
