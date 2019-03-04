import React from 'react';
import { menuStyle , buttonStyle , gridStyle , gridScreenStyle, gridImgStyle, gridCaptionStyle } from './styles/FilterStyle';
import  StackGrid, { transitions, easings }from 'react-stack-grid';
import screens from './data.json';


class Filter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            screens: screens,
            filteredScreens: screens
        }
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
            <div className='container'>
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
                    {filteredScreens.map((screens) => {
                        return (
                            <figure style={gridScreenStyle} key={screens.key}>
                                <img style={gridImgStyle} src={screens.url} alt={screens.name}/>
                                <figcaption style={gridCaptionStyle}>{screens.name}</figcaption>
                            </figure>

                        )
                    })}
                </StackGrid>
            </div>
        )
    }
}

export default Filter;