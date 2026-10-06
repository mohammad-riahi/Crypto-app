// we are using this function to conver our fetched data for our chart to format which can be used in chart.

const convertData = (data, type) => {
  const convertedData = data[type].map((item) => {
    return {
      date: item[0],
      [type]: item[1],
    };
  });

  return convertedData;
};

export { convertData };
