import "@/public/styles/global.css";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  outerViewContainer: {flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#ecf0f1'
  },
  title: { fontSize: 32, marginBottom: 20, textAlign: 'center'
  },
  inputText: { flex: 1, marginRight:8, height: 50, borderColor: '#333', borderWidth: 1, paddingHorizontal: 10, borderRadius: 6
  },
  suggestionList: { backgroundColor: '#fff', borderRadius: 6, marginBottom: 8, maxHeight: 300, minHeight:150,
  },
  suggestion: { padding: 10, borderBottomColor: '#ddd', borderBottomWidth: 1
  },
  errorText: { marginTop: 20, color: 'red', textAlign: 'center'
  },
  mainWeatherContainer: { marginTop: 20, alignItems: 'center'
  },
  resultText: { fontSize: 18, marginVertical: 4,
  },
  attributeMsg: { fontSize: 10, marginVertical: 4
  },
  currentWeatherContainer: {  width: 280, borderRadius: 6, backgroundColor: '#ffffff', paddingVertical: 16,
    paddingHorizontal: 8, margin: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
  },
  iconImg: { height: 40, width: 40, resizeMode: 'contain'
  },
  currentWeatherCard: { width: 260, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12,
  },
  slide: { width: 100, height: 200, justifyContent: 'center', alignItems: 'center',
  },
  slideText: { fontSize: 24, fontWeight: 'bold', color: 'black'
  },
  scrollContainer: { flexDirection: "row", width:500
  },
  keyboardOuterContainer:{ flex:1
  },
  pressableContainer:{flex:1
  },
  titleText:{textAlign: 'center', marginBottom: 20, fontSize: 40
  },
  pressableHistory:{alignItems: 'center', padding: 7, backgroundColor: '#eee', borderRadius: 6
  },
  weatherMainScrollView:{
  },
  searchView:{flexDirection: "row", alignItems:"center", marginBottom: 10
  },
  locationIcon:{width: 24, height: 24
  },
  tempControlContainer:{flexDirection: "row", alignItems:"center", justifyContent:"space-evenly", width:800
  },
  hourlyContainer:{ height: 220, marginTop: 16
  },
  subTitle:{fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 8, 
  },
  dailyList:{width:500
  },
  text:{textAlign:'center'
  },
  dailyContainer: {

  },
  dailySecCard: {flexDirection: 'row', flexWrap: 'wrap' , alignItems: 'center', justifyContent: 'space-evenly', marginHorizontal: 8, height: 50, width: 110 

  },
  dailyCards: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 6, borderColor: '#3CA6E8', borderWidth: 1, borderRadius: 6, shadowColor: '#000'
    ,shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginLeft: 1
  },
  dayCardContainer: {flexDirection: 'column',  alignItems: 'center', justifyContent: 'center',       
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, backgroundColor: '#ffffff', margin: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2,
  },
  innerDayCard: {flexDirection: 'row', alignItems: 'center',      
    justifyContent: 'space-evenly', marginTop: 4
  }
});
