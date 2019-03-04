import React from 'react';
import StackGrid from "react-stack-grid";
import screens from './data.json';


class Filter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            screens: screens,
            filteredScreens: screens,
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
        
        return (
            <div>
                {categories.map(category => {
					return (
                            <button 
                                type="button" 
                                onClick={() => this.compareBy(category)} key={category}>
                                {category}
                            </button>
                        )
				})}
                <button 
					type="button" 
					onClick={() => this.reset()}>
                    all
                </button>
                <StackGrid
                    columnWidth={150}
                >
                    {filteredScreens.map((screens) => {
                        return (
                            <figure key={screens.key}>
                                <img src={screens.url} alt={screens.name}/>
                                <figcaption>{screens.name}</figcaption>
                            </figure>

                        )
                    })}
                </StackGrid>
            </div>
        )
    }
}

export default Filter;