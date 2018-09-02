class MyInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
    }
    render() {
        return (
            <ReactAutocomplete
                inputProps={{ style: { border: '1px solid #483D8B', padding: '10px', borderRadius: '5px', width: '225px', backgroundColor: '#dcdcdd' }, placeholder: 'Search Movies' }}
                
                items={[
                    { id: 'foo', label: 'foo' },
                    { id: 'bar', label: 'bar' },
                    { id: 'baz', label: 'baz' },
                  ]}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}

                renderItem={(item, highlighted, style) =>
                    <div className="search-ac"
                        key={item.id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                    >
                        {item.label}
                    </div>
                }
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={value => this.setState({ value })}
            />
        )
    }
}