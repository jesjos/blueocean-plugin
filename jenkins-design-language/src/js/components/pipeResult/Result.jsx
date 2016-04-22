import React, { Component, PropTypes } from 'react';
import SvgDuration from './SvgDuration';
import SvgTime from './SvgTime';
import SvgError from './SvgError';
import SvgSuccess from './SvgSuccess';

import moment from 'moment';

const { object } = PropTypes;

class PipelineResult extends Component {
    render() {
        const {
            data: {
                id,
                name,
                organization,
                pipeline,
                changeSet,
                result,
                durationInMillis,
                endTime,
                commitId,

            },
        } = this.props;

        let
            duration = moment.duration(
                Number(durationInMillis), 'milliseconds').humanize();
        const authors = [...new Set(changeSet.map(change => change.author.fullName))];

        return (<div className="result">
            <section className="left">
                { result === 'SUCCESS' && <SvgSuccess />}
                { result === 'FAILURE' && <SvgError />}
            </section>
            <section className="table">
                <h4>{organization} / {name} #{id}</h4>

                <div className="row">
                    <div className="commons">
                        <div>Branch&nbsp;
                            <span className="value">{pipeline}</span>
                        </div>
                        <div>Commit&nbsp;
                            <span className="value">
                                #{commitId && commitId.substring(0, 8) || '-'}
                            </span>
                        </div>
                        <div>
                           {
                               authors.length > 0 ? `Changes by ${authors.map(
                                 author => ' ' + author)}` : 'No changes'
                            }
                        </div>
                    </div>
                    <div className="times">
                        <div>
                            <SvgDuration />
                            <span>{duration}</span>
                        </div>
                        <div>
                            <SvgTime />
                            {moment(endTime).fromNow()}
                        </div>
                    </div>
                </div>
            </section>
        </div>);
    }
}

PipelineResult.propTypes = {
    data: object.isRequired,
    colors: object,
};

export {
    PipelineResult,
    SvgDuration,
    SvgTime,
    SvgError,
    SvgSuccess,
};