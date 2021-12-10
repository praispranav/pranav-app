{subscriptionData.map((item, subscriptionIndex) => {
    const checkDays = (currentDay) => {
      const a = item.days.findIndex((dayCh) => dayCh === currentDay);
      if (a !== -1) return true;
      return false;
    };
    return (
      <View style={{ marginBottom: Spacing.Large }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: Spacing.Large,
          }}
        >
          <Image
            source={item.image}
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
          <View style={{ marginLeft: Spacing.Medium, width: "74%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "MPlusBold" }}>
                {item.name}
              </Text>
              {/* <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: theme.backgroundColor,
                  paddingHorizontal: Spacing.ExtraLarge,
                  paddingVertical: Spacing.ExtraSmall,
                }}
              >
                <Text style={{ color: "white" }}>Add</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "MPlusBold",
                  fontSize: Font.Small,
                }}
              >
                ₹ {item.price}/{item.priceUnit}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: Spacing.Small,
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ color: "Black" }}>From {"  "}- </Text>
                <TouchableOpacity
                  onPress={() => setFromDateVisible((prev) => !prev)}
                >
                  <Text
                    style={{ marginHorizontal: Spacing.ExtraSmall }}
                  >
                    {item.fromDate}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* {fromDateVisible && (
                <DateTimePicker
                  onChange={() => console.log("hello")}
                  value={new Date()}
                  display="default"
                  mode="date"
                />
              )}
              {toVisible && (
                <DateTimePicker
                  onChange={() => console.log("Hello")}
                  value={new Date()}
                  display="default"
                  mode="date"
                />
              )} */}
              <View
                style={{
                  marginLeft: Spacing.Medium,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text>To {"  -"}</Text>
                <TouchableOpacity
                  onPress={() => setToDateVisible((prev) => !prev)}
                >
                  <Text style={{ marginLeft: Spacing.ExtraSmall }}>
                    {item.toDate}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {days.map((day) => (
            <TouchableOpacity
              onPress={() =>
                handleDaySelector(subscriptionIndex, item.days, day)
              }
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
                height: 20,
                borderRadius: 50,
                backgroundColor: checkDays(day)
                  ? theme.backgroundColor
                  : theme.lightgrey,
              }}
            >
              <Text
                style={{ color: checkDays(day) ? "white" : "black" }}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  })}