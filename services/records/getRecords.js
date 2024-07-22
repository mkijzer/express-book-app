import records from "../../data/records.json" assert { type: "json" };

const getRecords = ({ artist, genre, available }) => {
  let filteredRecords = records;

  if (artist) {
    filteredRecords = filteredRecords.filter((record) =>
      record.artist.toLowerCase().includes(artist.toLowerCase())
    );
  }

  if (genre) {
    filteredRecords = filteredRecords.filter(
      (record) => record.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (available !== undefined) {
    const isAvailable = available === "true";
    filteredRecords = filteredRecords.filter(
      (record) => record.available === isAvailable
    );
  }

  return filteredRecords;
};

export default getRecords;
