import React from 'react';

export default function withDataFetching(WrappedCommponent) {
    return class extends React.Component {
        contructor(props) {
            super(props);
            this.state = {
                data: [],
                loading: true,
                error: '',
            };
        }

        async componentDidMount() {
            try {
                const data = await fetch(this.props.dataSource);
                const dataJSON = await data.json();

                if (dataJSON) {
                    this.setState({
                        data: dataJSON,
                        loading: false,
                    });
                }
            } catch(error) {
                this.setState({
                    loading: false,
                    error: error.message,
                });
            }
        }

        render() {
            const { data, loading, error } = this.state;

            return (
                <WrappedCommponent
                    data={data}
                    loading={loading}
                    error={error}
                    {...this.props}
                />
            )
        }
    }
}