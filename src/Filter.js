import React from 'react';
import Loading from './Loading';
import { menuStyle , buttonStyle , gridStyle , gridScreenStyle, gridImgStyle, gridCaptionStyle } from './styles/FilterStyle';
import  StackGrid, { transitions, easings }from 'react-stack-grid';


class Filter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            screens: [],
            filteredScreens: []
        }
    }

    componentDidMount(){
        this.setState({loading: true})
        fetch('https://api.jsonbin.io/b/5c7db3a72e4731596f15c20d')
        .then(response => response.json())
        .then(data => this.setState({ 
            loading: false,
            screens: data.images, 
            filteredScreens: data.images
        }))
        .catch(err => {
            console.log(err);
        });
    }

    compareBy(key){
        this.setState({
            filteredScreens: this.state.screens.filter(screen => {
                return screen.name === key ;
            })
        })
    }

    reset(){
        this.setState({
            filteredScreens: this.state.screens
        })
    }

    render(){
        const { filteredScreens, screens } = this.state
        const categories = [...new Set(screens.map(screen => screen.name))]
        const transition = transitions.scaleDown;
        return (
            this.state.loading === false
            ? <div className='container'>
                <div style={menuStyle}>
                    <button
                        type="button"
                        onClick={() => this.reset()}
                        key="reset"
                        style={buttonStyle}
                    >
                        all
                    </button>
                    {categories.map(category => {
                        return (
                                <button
                                    type="button"
                                    onClick={() => this.compareBy(category)} 
                                    key={category}
                                    style={buttonStyle}
                                    >
                                    {category}
                                </button>
                            )
                    })}
                </div>
                <StackGrid
                    style={gridStyle}
                    columnWidth={200}
                    gutterWidth={15}
                    gutterHeight={15}
                    duration={600}
                    easing={easings.cubicOut}
                    appearDelay={60}
                    appear={transition.appear}
                    appeared={transition.appeared}
                    enter={transition.enter}
                    entered={transition.entered}
                    leaved={transition.leaved}
                >
                    {filteredScreens.map( screens => {
                        return (
                            <figure style={gridScreenStyle} key={screens.key}>
                                <img style={gridImgStyle} src={screens.url} alt={screens.name}/>
                                <figcaption style={gridCaptionStyle}>{screens.name}</figcaption>
                            </figure>

                        )
                    })}
                </StackGrid>
            </div>
            : <Loading/>
        )
    }
}

export default Filter;