import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Card } from "react-native-paper";

const Prices = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [commodity, setCommodity] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setNoResults(false);
    const apiKey = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
    let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json`;

    let filters = [];
    if (state) filters.push(`filters[state.keyword]=${state}`);
    if (district) filters.push(`filters[district.keyword]=${district}`);
    if (commodity) filters.push(`filters[commodity.keyword]=${commodity}`);

    if (filters.length > 0) {
      url += `&${filters.join("&")}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
    //   setPrices(data.records);
    if (data.records.length === 0) {
        setNoResults(true);
      } else {
        setPrices(data.records);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Market Prices</Text>
      <Text style={styles.subHeader}>Check real-time agricultural commodity prices</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter State"
          value={state}
          onChangeText={setState}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter District"
          value={district}
          onChangeText={setDistrict}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Commodity"
          value={commodity}
          onChangeText={setCommodity}
          placeholderTextColor="#666"
        />
      </View>

      <Button mode="contained" onPress={fetchData} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : "Get Prices"}
      </Button>

      {noResults && !loading && (
        <Text style={styles.noResultsText}>No records found. Please try again with different inputs.</Text>
      )}

      {!noResults && prices.length > 0 && (

    //   {prices.length > 0 && (
        <Card style={styles.card}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableCellHeader}>Market</Text>
            <Text style={styles.tableCellHeader}>Commodity</Text>
            <Text style={styles.tableCellHeader}>Min Price</Text>
            <Text style={styles.tableCellHeader}>Max Price</Text>
          </View>

          <FlatList
            data={prices}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={[styles.tableRow, index % 2 === 0 && styles.alternateRow]}>
                <Text style={styles.tableCell}>{item.market}</Text>
                <Text style={styles.tableCell}>{item.commodity}</Text>
                <Text style={styles.tableCell}>{item.min_price} ₹</Text>
                <Text style={styles.tableCell}>{item.max_price} ₹</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" ,maxHeight:'380'},
  header: { fontSize: 26, fontWeight: "bold", textAlign: "center", color: "#2d3436" },
  subHeader: { textAlign: "center", fontSize: 14, color: "#636e72", marginBottom: 20 },

  inputContainer: { marginBottom: 15 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 6,
    elevation: 2,
  },

  button: { marginVertical: 15, backgroundColor: "#2ecc71", padding: 8, borderRadius: 50 },

  card: { backgroundColor: "#fff", padding: 10, borderRadius: 12, elevation: 3, marginTop: 15 },

  tableRowHeader: { flexDirection: "row", padding: 12, backgroundColor: "#2ecc71", borderRadius: 10 },
  tableRow: { flexDirection: "row", padding: 12, borderBottomWidth: 1, borderColor: "#ddd" },
  alternateRow: { backgroundColor: "#ecf0f1" },

  tableCellHeader: { flex: 1, fontWeight: "bold", color: "#fff", textAlign: "center" },
  tableCell: { flex: 1, textAlign: "center", color: "#333", paddingVertical: 4 },
  noResultsText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#d63031" },
});

export default Prices;
