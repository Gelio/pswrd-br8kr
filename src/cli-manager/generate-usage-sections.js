module.exports = function generateUsageSections(optionDefinitions) {
  return [
    {
      header: 'pswrd-br8kr',
      content: 'Apache authentication password breaker.'
    },
    {
      header: 'Options',
      optionList: optionDefinitions
    }
  ];
}
