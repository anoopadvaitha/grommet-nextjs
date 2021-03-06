// eslint-disable-next-line no-underscore-dangle
export const _starter = `class Demo extends React.Component {
  constructor() {
    super();
    this.state = { selected: ['one', 'five'] };
  }  
  render() {
    const { selected } = this.state;
    return (
      <Box align='center'>
        <Tags
          value={selected}
          onChange={({ value }) => this.setState({ selected: value })}
          placeholder='Multiselect'
        />
      </Box>  
    );
  }
}    

render(<Demo />);  
`;
