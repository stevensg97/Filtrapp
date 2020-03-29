export const colors = {
  white: '#fff',
  lightgreen: '#62E3B3',
  lightpurple: '#6243D3',
  lightrose: '#E300EF',
  black: '#000',
  deepgreen: '#686d3b',
  grey: 'grey',
  transparent: 'transparent',
  placeholderColor: 'rgb(100,100,100)',
  inputColor: 'rgba(150,150,150,0.4)'
}

export const commonStyles = {
  buttonContainer: {
    backgroundColor: colors.lightrose,
    borderRadius: 15,
    paddingVertical: 15,
    margin: 5
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectedButtonContainer: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.deepgreen,
    borderRadius: 15,
    margin: 5,
    paddingVertical: 15
  },
  selectedButtonText: {
    color: colors.deepgreen,
    fontWeight: '700',
    textAlign: 'center',
  },
}
