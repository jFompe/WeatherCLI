const inquirer = require('inquirer')
require('colors')




const inquirerMenu = async () => {

  const menuOptions = [
    {
      type: 'list',
      name: 'option',
      message: 'Select an action',
      choices: [
        'Search city',
        'History',
      ].map((c,i) => ({
        value: i+1,
        name: `${`${i+1}`.green} ${c}`
      })).concat([{
        value: 0,
        name: `${'0'.green} Exit`
      }])
    }
  ]

  console.clear()
  console.log('=====================')
  console.log('  Select an action'.white)
  console.log('=====================')

  const { option } = await inquirer.prompt(menuOptions)
  return option
}

const readInput = async message => {

  const inputPrompt = [
    {
        type: 'input',
        name: 'desc',
        message,
        validate: value => 
          value.length === 0 
            ? 'Por favor ingrese un valor' 
            : true
    }
  ]

  const { desc } = await inquirer.prompt(inputPrompt)
  return desc
}

const selectFromList = async list => {
  
  const listPromp = [{
    type: 'list',
    name: 'id',
    message: 'Select',
    choices: list.map( (p,i) => ({
        value: p.id,
        name: `${i+1}. ${p.name}`
      })).concat([{
        value: 0,
        name: `${'0'.green} Exit`
      }])
  }]

  const { id } = await inquirer.prompt(listPromp)
  return id
}

const wait = async () => {

  const continuePrompt = [
    {
        type: 'input',
        name: 'enter',
        message: `Press ${ 'enter'.green } to resume`
    }
  ]

  console.log('\n');
  await inquirer.prompt(continuePrompt)
}




module.exports = {
  inquirerMenu,
  readInput,
  selectFromList,
  wait,
}