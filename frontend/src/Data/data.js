const data = {
  name: 'Computer Science',
  toggled: true,
  children: [
    {
      name: 'Fundamentals',
      children: [
        {
          name: 'Essentials',
          children: [
            {
              name: 'Programming Concepts',
              children: [
                { name: 'Intro to Programming' },
                { name: 'Object-oriented Programming' },
                { name: 'Programming Techniques' },
              ],
            }, 
            { name: 'Fields of Programming' },
          ],
        },
        { name: 'Operating Systems' },
      ],
    },
    {
      name: 'Web Technologies',
      children: [{ name: 'HTML/CSS' }, { name: 'JavaScript' }],
    },
  ],
};

export default data;
